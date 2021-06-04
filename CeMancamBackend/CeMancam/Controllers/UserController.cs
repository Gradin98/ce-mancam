using CeMancam.Middlewares;
using CeMancam.Models;
using CeMancam.Services.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Provider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CeMancam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IUserService _userService;
        private readonly ISecurityService _securityService;

        public UserController(ILogger<UserController> logger,
            IRepositoryWrapper repository,
            IUserService userService,
            ISecurityService securityService)
        {
            _logger = logger;
            _repository = repository;
            _userService = userService;
            _securityService = securityService;
        }

        [Authorize]
        [HttpGet("check")]
        public async Task<IActionResult> Check()
        {
            return Ok();
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(User user, int id)
        {
            var dbUser = _repository.User.FindById(id);
            if (dbUser == null) return NotFound();

            dbUser.Email = user.Email;
            dbUser.Password = await _securityService.Encrypt(user.Password);

            _repository.User.Update(dbUser);
            await _repository.Save();

            return Ok(new
            {
                message = "Resource was updated"
            });
        }

        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = _repository.User.FindById(id);
            if (user == null) return NotFound();


            _repository.User.Delete(user);
            await _repository.Save();
            return Ok(new
            {
                message = "Resource was deleted"
            });
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> All()
        {
            return Ok(_repository.User.FindAll());
        }

        [Authorize]
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = _repository.User.FindById(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (_repository.User.FindByCondition(x => x.Email.Equals(user.Email)).ToArray().Length > 0)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            user.Password = await _securityService.Encrypt(user.Password);

            _repository.User.Create(user);
            await _repository.Save();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
    }
}

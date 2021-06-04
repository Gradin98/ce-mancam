using Domain.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Provider;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CeMancam.Services.Interfaces;
using CeMancam.Models;

namespace CeMancam.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly AppSettings _appSettings;
        private readonly ISecurityService _securityService;

        public UserService(IRepositoryWrapper repository,
            IOptions<AppSettings> appSettings,
            ISecurityService securityService)
        {
            _repository = repository;
            _appSettings = appSettings.Value;
            _securityService = securityService;
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
        {

            var user = _repository.User.FindByCondition(x => x.Email.Equals(model.Email));
            if (user.AsEnumerable().ToArray().Length == 0) return null;

            var decrptedPass = await _securityService.Decrypt(user.First().Password);
            if (decrptedPass != model.Password) return null;

            var token = GenerateJwtToken(user.First());
            return new AuthenticateResponse
            {
                Token = token,
                User = user.First()
            };
        }

        public User GetById(int id)
        {
            return _repository.User.FindById(id);
        }

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

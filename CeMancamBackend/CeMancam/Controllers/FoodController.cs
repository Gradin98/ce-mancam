using CeMancam.Middlewares;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Provider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CeMancam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public FoodController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet("get/user/{id}")]
        public async Task<IActionResult> GetFoodForUser(int id)
        {
            var foods = _repository.Food.FindByCondition(x => x.UserId.Equals(id)).ToList();
            return Ok(foods);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddFood(Food food)
        {
            _repository.Food.Create(food);
            await _repository.Save();

            return Ok(food);
        }

        [Authorize]
        [HttpGet("get/random/{id}")]
        public async Task<IActionResult> GetRandomFood(int id)
        {
            var foods = _repository.Food.FindByCondition(x => x.UserId.Equals(id)).ToList();

            if (foods.Count == 0) return Ok(new object { });

            var randomNumber = new Random().Next(0, foods.Count);

            var lastFood = _repository.History.FindByCondition(x => x.UserId.Equals(id)).OrderByDescending(x => x.CreatedOn).FirstOrDefault();

            if(lastFood != null)
            {
                while (foods[randomNumber].Id == lastFood.FoodId)
                {
                    randomNumber = new Random().Next(0, foods.Count);
                }
            }

            _repository.History.Create(new History
            {
                FoodId = foods[randomNumber].Id,
                UserId = id
            });

            await _repository.Save();

            return Ok(foods[randomNumber]);
        }

        [HttpPut("edit/{id}/{title}")]
        public async Task<IActionResult> Edit(string title, int id)
        {
            var food = _repository.Food.FindById(id);
            if (food == null) return NotFound("Resource was not founded");

            food.Title = title;

            _repository.Food.Update(food);
            await _repository.Save();

            return Ok(new
            {
                message = "Resource was updated"
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var food =  _repository.Food.FindById(id);
            if (food == null) return NotFound("Resource was not founded");

            _repository.Food.Delete(food);
            await _repository.Save();

            return Ok(new
            {
                message = "Resource was deleted"
            });
        }

    }
}

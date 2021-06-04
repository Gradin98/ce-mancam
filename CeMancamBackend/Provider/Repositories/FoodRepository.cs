using Domain;
using Domain.Models;
using Provider.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Provider.Repositories
{
    public class FoodRepository : RepositoryBase<Food>, IFoodRepository
    {
        public FoodRepository(AppDbContext dbContext) : base(dbContext) { }
    }
}

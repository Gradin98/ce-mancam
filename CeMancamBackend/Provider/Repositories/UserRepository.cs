using Domain;
using Domain.Models;
using Provider.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Provider.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(AppDbContext dbContext) : base(dbContext) { }
    }
}

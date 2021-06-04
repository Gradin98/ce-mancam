using Domain;
using Provider.Repositories;
using Provider.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Provider
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private AppDbContext _dbContext;
        private IUserRepository _user;
        private IFoodRepository _food;
        private IHistoryRepository _history;

        public RepositoryWrapper(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IUserRepository User
        {
            get
            {
                if (_user == null)
                    _user = new UserRepository(_dbContext);

                return _user;
            }
        }

        public IFoodRepository Food
        {
            get
            {
                if (_food == null)
                    _food = new FoodRepository(_dbContext);

                return _food;
            }
        }

        public IHistoryRepository History
        {
            get
            {
                if (_history == null)
                    _history = new HistoryRepository(_dbContext);

                return _history;
            }
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

    }
}

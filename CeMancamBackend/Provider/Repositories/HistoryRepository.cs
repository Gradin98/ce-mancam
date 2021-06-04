using Domain;
using Domain.Models;
using Provider.Repositories.Interfaces;
namespace Provider.Repositories
{
    public class HistoryRepository : RepositoryBase<History>, IHistoryRepository
    {
        public HistoryRepository(AppDbContext dbContext) : base(dbContext) { }
    }
}

using Provider.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Provider
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        IFoodRepository Food { get; }
        IHistoryRepository History { get; }
        Task Save();
    }
}

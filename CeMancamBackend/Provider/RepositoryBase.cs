using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Provider
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext DbContext { get; set; }

        public RepositoryBase(AppDbContext dbContext)
        {
            DbContext = dbContext;
        }

        void IRepositoryBase<T>.Create(T entity)
        {
            DbContext.Set<T>().Add(entity);
        }

        void IRepositoryBase<T>.Delete(T entity)
        {
            DbContext.Set<T>().Remove(entity);
        }

        IQueryable<T> IRepositoryBase<T>.FindAll()
        {
            return DbContext.Set<T>().AsNoTracking();
        }

        IQueryable<T> IRepositoryBase<T>.FindByCondition(Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>().Where(expression).AsNoTracking();
        }

        void IRepositoryBase<T>.Update(T entity)
        {
            DbContext.Set<T>().Update(entity);
        }

        T IRepositoryBase<T>.FindById(int id)
        {
            return DbContext.Set<T>().Find(id);
        }
    }
}

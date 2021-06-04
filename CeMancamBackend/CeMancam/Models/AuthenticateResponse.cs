using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CeMancam.Models
{
    public class AuthenticateResponse
    {
        public User User { get; set; }
        public string Token { get; set; }
    }
}

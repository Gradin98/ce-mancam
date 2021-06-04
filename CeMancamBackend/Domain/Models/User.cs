using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public virtual List<History> Histories { get; set; }
    }
}

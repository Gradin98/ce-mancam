using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Models
{
    public class History : BaseEntity
    {
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Food")]
        public int FoodId { get; set; }
        public virtual Food Food { get; set; }
    }
}

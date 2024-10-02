using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Insta
{
    public class EditNameModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string NewName { get; set; }
        [Required]
        public string Password { get; set; }


    }
}

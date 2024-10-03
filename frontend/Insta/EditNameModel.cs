using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Insta
{   /* Théo Neusser
    * IDA-P4C
    * Atelier Prog
    * 10.03.2024
    */

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

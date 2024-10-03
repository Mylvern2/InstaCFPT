using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Insta
{
    /* Théo Neusser
    * IDA-P4C
    * Atelier Prog
    * 10.03.2024
    */
    public class LoginModel
    {
        [Required]
        [JsonPropertyName("name")]
        public string UserName { get; set; }
        [Required]
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}

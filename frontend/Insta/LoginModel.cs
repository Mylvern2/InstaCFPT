using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Insta
{
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

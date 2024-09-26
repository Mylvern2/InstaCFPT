using InstaCFPT.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;

namespace InstaCFPT.Controllers
{
    [ApiController]
    [Route("/image/upload")]
    public class ImageController : ControllerBase
    {
        
        [HttpPost]
        public IActionResult UploadImage(IFormFile file)
        {
            if (file.Length == 0 || file == null)
            {
                return BadRequest("Image wasn't given");
            }
            byte[] data;
            using var stream = file.OpenReadStream();

            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                data = memoryStream.ToArray();
            }
            
            Image imageToSave = new Image(Convert.ToBase64String(data), file.ContentType.Split('/')[1]);

            return Ok("Image saved");


        }
    }
}

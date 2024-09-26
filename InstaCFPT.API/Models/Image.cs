using System.Text;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;

namespace InstaCFPT.Models
{
    public class Image
    {
        private string _name;
        private string _imgBase64;
        private string _format;
        public string ImgBase64 { get => _imgBase64; set => _imgBase64 = value; }
        public string Format { get => _format; set => _format = value; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="imgBase64"></param>
        /// <param name="format">The file extension (e.g. .png)</param>
        public Image(string imgBase64, string format)
        {
            ImgBase64 = imgBase64;
            Format = format;
            SaveImage();
        }

        private void SaveImage()
        {
            byte[] imageData = Convert.FromBase64String(ImgBase64);
            string fileName = GetRandomString(10);
            File.WriteAllBytes($"./Uploads/Images/{fileName}.{Format}", imageData);
        }

        private string GetRandomString(int length)
        {
            Random r = new Random();
            byte[] array = new byte[length];
            r.NextBytes(array);
            return Encoding.Default.GetString(array);
        }
    }
}

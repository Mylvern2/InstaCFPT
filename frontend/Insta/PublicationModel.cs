using Newtonsoft.Json;

namespace Insta
{
    public class PublicationModel
    {
        /* Théo Neusser
        * IDA-P4C
        * Atelier Prog
        * 10.03.2024
        */
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
        [JsonProperty("author")]
        public string Author { get; set; }
        [JsonProperty("image")]
        public string Image { get; set; }
        public string AuthorName { get; set; }
        public string Comment { get; set; }
        // return the number of likes
        public int LikesCount { get; set; }
    }
}

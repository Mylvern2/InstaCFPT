namespace Insta
{
    public class PublicationModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public string AuthorName { get; set; }
        public string Comment { get; set; }
        // return the number of likes
        public int LikesCount { get; set; }
    }
}

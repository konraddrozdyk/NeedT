using System.ComponentModel.DataAnnotations;

namespace NeedTBackend.Dtos
{
    public class CreateJobDto
    {
        public string Title { get; set; } = null!;
        [Required]
        public string Origin { get; set; } = null!;
        [Required]
        public string Destination { get; set; } = null!;
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public bool Precaution { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Description { get; set; }
        [Required]
        public int OrdererId { get; set; }
    }
}

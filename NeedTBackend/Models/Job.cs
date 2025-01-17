namespace NeedTBackend.Models;

public class Job 
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Origin { get; set; } = null!;
    public string Destination { get; set; } = null!;
    public bool Precaution { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public bool Completed { get; set; }
    public bool Accepted { get; set; }
}

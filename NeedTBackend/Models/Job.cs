namespace NeedTBackend.Models;

public class Job 
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string Origin { get; set; } = null!;
    public string Destination { get; set; } = null!;
    public bool Precaution { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public Status JobStatus { get; set; }
    public int OrdererId { get; set; }
    public int? TransporterId { get; set; }
    public User Orderer { get; set; } = null!;
    public User? Transporter { get; set; } = null!;



    public enum Status
    {
        Pending,
        Accepted,
        Completed
    }
}

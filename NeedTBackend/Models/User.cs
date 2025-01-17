namespace NeedTBackend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public Role UserRole { get; set; }

    public ICollection<Job> JobsAsTransporter { get; set; } = null!;
    public ICollection<Job> JobsAsOrderer { get; set; } = null!;


    public enum Role
    {
        Orderer,
        Transporter
    }
}
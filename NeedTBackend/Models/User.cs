namespace NeedTBackend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public enum Role
    {
        Orderer,
        Transporter
    }
}
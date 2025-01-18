using NeedTBackend.Models;

namespace NeedTBackend.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string UserRole { get; set; } = null!;
}
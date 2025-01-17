using NeedTBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace NeedTBackend.DTOs;

public record CreateUserDto
{
    [Required]
    public string Username { get; set; } = null!;

    [Required]
    public User.Role UserRole { get; set; }
}

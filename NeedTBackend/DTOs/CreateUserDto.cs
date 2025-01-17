using NeedTBackend.Models;

namespace NeedTBackend.DTOs;

public record CreateUserDto(string Username, User.Role UserRole);
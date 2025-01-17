using NeedTBackend.Data;
using NeedTBackend.DTOs;
using NeedTBackend.Models;

namespace NeedTBackend.Services;

public class UserService : IUserService
{
    private readonly NeedTDbContext _context;

    public UserService(NeedTDbContext context)
    {
        _context = context;
    }
    public async Task<UserDto> CreateUserAsync(CreateUserDto user)
    {
        if (string.IsNullOrWhiteSpace(user.Username))
        {
           throw new ArgumentException("Username cannot be empty");
        }
        var newUser = new User
        {
            Username = user.Username,
            UserRole = user.UserRole
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return new UserDto { Id = newUser.Id, Username = newUser.Username, UserRole = newUser.UserRole };        
    }

}

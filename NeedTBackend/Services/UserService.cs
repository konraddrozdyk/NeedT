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

    public async Task<UserDto> GetUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {id} not found.");
        }
        return new UserDto { Id = user.Id, Username = user.Username, UserRole = user.UserRole };
    }

}

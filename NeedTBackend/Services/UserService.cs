using Microsoft.EntityFrameworkCore;
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
        if (string.IsNullOrWhiteSpace(user.Password))
        {
           throw new ArgumentException("Password cannot be empty");
        }
        var newUser = new User
        {
            Username = user.Username,
            Password = user.Password,
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

    public async Task<UserDto> LoginAsync(LoginDto login)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);
        if (user == null)
        {
            throw new KeyNotFoundException("Invalid username or password");
        }
        return new UserDto { Username = user.Username, UserRole = user.UserRole, Id = user.Id };
    }
}

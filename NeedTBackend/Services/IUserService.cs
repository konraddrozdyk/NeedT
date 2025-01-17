using NeedTBackend.DTOs;
using NeedTBackend.Models;

namespace NeedTBackend.Services;

public interface IUserService
{
    Task<UserDto> CreateUserAsync(CreateUserDto user);
    Task<UserDto> GetUserAsync(int id);
    Task<UserDto> LoginAsync(LoginDto login);
    // Task<User> GetUserByUsernameAsync(string username);
    // Task<IEnumerable<User>> GetUsersAsync();
    // Task<User> UpdateUserAsync(int id, User user);
    // Task DeleteUserAsync(int id);
}
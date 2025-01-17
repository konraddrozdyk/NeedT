using NeedTBackend.Models;

namespace NeedTBackend.Services;

public interface IUserService
{
    Task<User> CreateUserAsync(User user);
    Task<User> GetUserAsync(int id);
    Task<User> GetUserByUsernameAsync(string username);
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User> UpdateUserAsync(int id, User user);
    Task DeleteUserAsync(int id);
}
using Microsoft.AspNetCore.Mvc;
using NeedTBackend.DTOs;
using NeedTBackend.Services;

namespace NeedTBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserControllers : ControllerBase
{
    private readonly IUserService _userService;

    public UserControllers(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUserAsync(CreateUserDto user)
    {
        try
        {
            var newUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserAsync), new { id = newUser.Id }, newUser);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserAsync(int id)
    {
        try
        {
            var user = await _userService.GetUserAsync(id);
            return Ok(user);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
}
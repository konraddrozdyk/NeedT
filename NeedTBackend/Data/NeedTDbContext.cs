using Microsoft.EntityFrameworkCore;
using NeedTBackend.Models;

namespace NeedTBackend.Data;

public class NeedTDbContext : DbContext
{
    public NeedTDbContext(DbContextOptions<NeedTDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
}
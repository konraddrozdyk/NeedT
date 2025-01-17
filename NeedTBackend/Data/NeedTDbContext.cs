using Microsoft.EntityFrameworkCore;

namespace NeedTBackend.Data;

public class NeedTDbContext : DbContext
{
    public NeedTDbContext(DbContextOptions<NeedTDbContext> options) : base(options)
    {
    }
    
    
}
using Microsoft.EntityFrameworkCore;
using NeedTBackend.Models;

namespace NeedTBackend.Data;

public class NeedTDbContext : DbContext
{
    public NeedTDbContext(DbContextOptions<NeedTDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Job> Jobs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Username).IsRequired();
            entity.Property(u => u.UserRole).HasConversion<string>();
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(j => j.Id);
            entity.Property(j => j.Title).HasMaxLength(100);
            entity.Property(j => j.Origin).IsRequired();
            entity.Property(j => j.Destination).IsRequired();
            entity.Property(j => j.JobStatus).HasConversion<string>(); 

            entity.HasOne(j => j.Orderer)
                .WithMany(u => u.JobsAsOrderer)
                .HasForeignKey(j => j.OrdererId)
                .OnDelete(DeleteBehavior.Restrict); 

            entity.HasOne(j => j.Transporter)
                .WithMany(u => u.JobsAsTransporter)
                .HasForeignKey(j => j.TransporterId)
                .OnDelete(DeleteBehavior.Restrict); 
        });
    }
}

using NeedTBackend.DTOs;
using NeedTBackend.Models;

namespace NeedTBackend.Dtos;

public class JobDto
{
    public string Title { get; set; } = null!;
    public string Origin { get; set; } = null!;
    public string Destination { get; set; } = null!;
    public bool Precaution { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public Job.Status JobStatus { get; set; }
    public int OrdererId { get; set; }
    public int? TransporterId { get; set; }
    public UserDto Orderer { get; set; } = null!;
    public UserDto? Transporter { get; set; } = null!;
}
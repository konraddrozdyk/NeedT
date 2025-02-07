using Microsoft.EntityFrameworkCore;
using NeedTBackend.Data;
using NeedTBackend.Dtos;
using NeedTBackend.Models;

namespace NeedTBackend.Services;

public class JobService : IJobService
{
    private readonly NeedTDbContext _context;
    
    public JobService(NeedTDbContext context)
    {
        _context = context;
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto createJobDto)
    {
        var job = new Job
        {
            Title = createJobDto.Title,
            Origin = createJobDto.Origin,
            Destination = createJobDto.Destination,
            Name = createJobDto.Name,
            Precaution = createJobDto.Precaution,
            Date = createJobDto.Date,
            Description = createJobDto.Description,
            OrdererId = createJobDto.OrdererId
        };

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();

        return new JobDto
        {
            Title = job.Title,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        };
    }

    public async Task<JobDto> GetJobByIdAsync(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
        {
            throw new Exception("Job not found");
        }

        return new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        };
    }

    public async Task<IEnumerable<JobDto>> GetJobsAsync()
    {
        var jobs = await _context.Jobs.ToListAsync();

        return jobs.Select(job => new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }

    public async Task<IEnumerable<JobDto>> GetPendingJobsAsync()
    {
        var jobs = await _context.Jobs.Where(job => job.JobStatus == Job.Status.Pending).ToListAsync();

        return jobs.Select(job => new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }

    public async Task<IEnumerable<JobDto>> GetAcceptedJobsAsync()
    {
        var jobs = await _context.Jobs.Where(job => job.JobStatus == Job.Status.Accepted).ToListAsync();

        return jobs.Select(job => new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }

    public async Task<IEnumerable<JobDto>> GetCompletedJobsAsync()
    {
        var jobs = await _context.Jobs.Where(job => job.JobStatus == Job.Status.Completed).ToListAsync();

        return jobs.Select(job => new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }

    public async Task<JobDto> AcceptJobAsync(int id, int transporterId)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
        {
            throw new Exception("Job not found");
        }

        job.JobStatus = Job.Status.Accepted;
        job.TransporterId = transporterId;
        await _context.SaveChangesAsync();

        return new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId,
            TransporterId = job.TransporterId
        };
    }

    public async Task<JobDto> CompleteJobAsync(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
        {
            throw new Exception("Job not found");
        }

        job.JobStatus = Job.Status.Completed;
        await _context.SaveChangesAsync();

        return new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Name = job.Name,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        };
    }
    
    public async Task<IEnumerable<JobDto>> GetJobsByTransporter(int transporterId)
    {
        var jobs = await _context.Jobs
            .Where(j => j.TransporterId == transporterId && j.JobStatus != Job.Status.Completed)
            .ToListAsync();

        return jobs.Select(job => new JobDto
        {
            Id = job.Id,
            Title = job.Title ?? string.Empty,
            Name = job.Name,
            Origin = job.Origin,
            Destination = job.Destination,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }


}
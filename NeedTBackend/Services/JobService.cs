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
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
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
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
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
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
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
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
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
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        });
    }

    public async Task<JobDto> AcceptJobAsync(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
        {
            throw new Exception("Job not found");
        }

        job.JobStatus = Job.Status.Accepted;
        await _context.SaveChangesAsync();

        return new JobDto
        {
            Title = job.Title ?? string.Empty,
            Origin = job.Origin,
            Destination = job.Destination,
            Precaution = job.Precaution,
            Date = job.Date,
            Description = job.Description,
            OrdererId = job.OrdererId
        };
    }
}
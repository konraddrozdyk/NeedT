using NeedTBackend.Dtos;
using NeedTBackend.Models;

namespace NeedTBackend.Services;

public interface IJobService
{
    // Task<IEnumerable<JobDto>> GetJobsAsync();
    Task<JobDto> GetJobByIdAsync(int id);
    Task<JobDto> CreateJobAsync(CreateJobDto createJobDto);
    // Task<Job> UpdateJobAsync(int id, UpdateJobDto updateJobDto);
    // Task DeleteJobAsync(int id);
}
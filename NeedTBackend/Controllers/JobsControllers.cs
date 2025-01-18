using Microsoft.AspNetCore.Mvc;
using NeedTBackend.Dtos;
using NeedTBackend.Services;

namespace NeedTBackend.Controllers;

public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpPost]
    public async Task<ActionResult<JobDto>> CreateJobAsync(CreateJobDto createJobDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var job = await _jobService.CreateJobAsync(createJobDto);
            return CreatedAtAction(nameof(GetJobByIdAsync), new { id = job.Id }, job);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJobByIdAsync(int id)
    {
        try
        {
            var job = await _jobService.GetJobByIdAsync(id);
            return Ok(job);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using NeedTBackend.Dtos;
using NeedTBackend.Services;

namespace NeedTBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
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
            return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, job);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJobById(int id)
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetJobsAsync()
    {
        var jobs = await _jobService.GetJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("pending")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetPendingJobsAsync()
    {
        var jobs = await _jobService.GetPendingJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("accepted")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetAcceptedJobsAsync()
    {
        var jobs = await _jobService.GetAcceptedJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("completed")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetCompletedJobsAsync()
    {
        var jobs = await _jobService.GetCompletedJobsAsync();
        return Ok(jobs);
    }

    [HttpPatch("{id}/accept")]
    public async Task<ActionResult<JobDto>> AcceptJobAsync(int id, [FromBody] int transporterId)
    {
        try
        {
            var job = await _jobService.AcceptJobAsync(id, transporterId);
            
            return Ok(job);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("{id}/complete")]
    public async Task<ActionResult<JobDto>> CompleteJobAsync(int id)
    {
        try
        {
            var job = await _jobService.CompleteJobAsync(id);
            return Ok(job);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("transporter/{transporterId}")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetJobsByTransporter(int transporterId)
    {
        var jobs = await _jobService.GetJobsByTransporter(transporterId);
        return Ok(jobs);
    }
}

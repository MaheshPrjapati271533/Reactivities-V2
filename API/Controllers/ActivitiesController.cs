using System;
using Application.Activities.Command;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return HadleRequest(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }
    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activitydto)
    {
        return HadleRequest(await Mediator.Send(new CreateActivity.Command { ActivityDto = activitydto }));
    }
    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        return HadleRequest(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HadleRequest(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
}

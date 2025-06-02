using System;
using Application.Activities.Validators;

namespace Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{
    public string Id { get; set; } = "";
}

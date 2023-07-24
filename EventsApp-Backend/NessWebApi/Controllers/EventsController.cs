using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NessWebApi.Data;
using NessWebApi.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace NessWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly DbContextNessApp _dbContextNessApp;

        public EventsController(IWebHostEnvironment webHostEnvironment, DbContextNessApp dbContextNessApp)
        {
            _webHostEnvironment = webHostEnvironment;
            _dbContextNessApp = dbContextNessApp;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var allEvents = await _dbContextNessApp.Events.Include(e => e.ImageUrl).ToListAsync();
            return Ok(allEvents);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
            var ev = await _dbContextNessApp.Events.FindAsync(id);
            if (ev == null)
            {
                return NotFound();
            }

            return Ok(ev);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewEvent([FromForm] Event newEvent, IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                newEvent.Id = Guid.NewGuid();
                newEvent.ImageUrl = "/uploads/" + uniqueFileName;

                _dbContextNessApp.Events.Add(newEvent);
                await _dbContextNessApp.SaveChangesAsync();

                return Ok(newEvent);
            }

            return BadRequest("No file or file is empty.");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateEvent(Guid id, [FromForm] Event updateEvent, IFormFile file)
        {
            var ev = await _dbContextNessApp.Events.FindAsync(id);
            if (ev == null)
            {
                return NotFound();
            }

            ev.Title = updateEvent.Title;
            // Actualizează restul proprietăților evenimentului

            if (file != null && file.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                ev.ImageUrl = "/uploads/" + uniqueFileName;
            }

            await _dbContextNessApp.SaveChangesAsync();

            return Ok(ev);
        }
    }
}
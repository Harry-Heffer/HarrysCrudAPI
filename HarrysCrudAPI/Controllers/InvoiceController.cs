using HarrysCrudAPI.Migrations;
using HarrysCrudAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.OpenApi.Validations;
using System.Threading.Tasks.Dataflow;

namespace HarrysCrudAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly DataContext _context;

        public InvoiceController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> Get()
        {
            if (_context.Invoices.ToList() == null)
            {
                return NotFound();
            }

            var invoices = await _context.Invoices.ToListAsync();
            return Ok(invoices);
        }
        [HttpGet("{AccountCode}")]
        public async Task<ActionResult<Invoice>> Get(string AccountCode)
        {
            var Invoices = await _context.Invoices.Where(x => x.AccountCode == AccountCode).ToListAsync();
            if (Invoices == null)
            {
                return NotFound("Invoice Not Found");
            }
            return Ok(Invoices);
        }
        [HttpPost]
        public async Task<ActionResult<List<Invoice>>> AddInvoice(Invoice obj)
        {
            if (obj == null)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                obj.AccountName = _context.Accounts.Where(x => x.AccountCode == obj.AccountCode).First().AccountName;
                _context.Invoices.Add(obj);
                await _context.SaveChangesAsync();
                return Ok(await _context.Invoices.ToListAsync());
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

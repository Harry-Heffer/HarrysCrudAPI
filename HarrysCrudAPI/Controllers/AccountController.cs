using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Threading.Tasks.Dataflow;

namespace HarrysCrudAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Account>>> Get()
        {
            if (_context.Accounts.ToList() == null)
            {
                return NotFound();
            }
            return Ok(await _context.Accounts.ToListAsync());
        }

        [HttpGet]
        [Route("Get/{id}")]
        public async Task<ActionResult<Account>> Get(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound("Account Not Found");
            }
            return Ok(account);
        }

        [HttpPost]
        public async Task<ActionResult<List<Account>>> AddAccount(Account obj)
        {
            if (obj == null)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                _context.Accounts.Add(obj);
                await _context.SaveChangesAsync();
                return Ok(await _context.Accounts.ToListAsync());
            } else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<Account>>> UpdateAccount(Account request)
        {
            var account = _context.Accounts.Where(_x => _x.AccountCode == request.AccountCode).First();
            if (account == null)
            {
                return BadRequest("Account Not Found");
            }

            account.AccountCode = request.AccountCode;
            account.AccountName = request.AccountName;
            account.Address = request.Address;
            account.PhoneNumber = request.PhoneNumber;
            account.EmailAddress = request.EmailAddress;
            account.PaymentTerms = request.PaymentTerms;
            account.TermsType = request.TermsType;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{accountCode}")]
        public async Task<ActionResult<List<Account>>> Delete(string accountCode)
        {
            if (accountCode == null)
            {
                return BadRequest();
            }
            var account = _context.Accounts.Where(_x => _x.AccountCode == accountCode).First(); ;
            if (account == null)
            {
                return BadRequest("Account Not Found");
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

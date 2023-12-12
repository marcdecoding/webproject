using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;



namespace GameStoreApi.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GamesController : ControllerBase

    {
        private readonly List<Game> games = new List<Game>
        {
            new Game("./assets/AD.jpg", 15, "Left Back", "Alfie Doughty"),
            new Game("./assets/CM.jpg", 15,"Forward", "Carlton Morris"),
            new Game("./assets/EA.jpg", 15, "Forward", "Elijah Adebayo"),
            new Game("./assets/GO.jpg", 05, "Centre Back", "Gabriel Osho"),
            new Game("./assets/IK.jpg", 14, "Right Back", "Issa Kabore"),
            new Game("./assets/PM.jpg", 15, "Midfielder", "Pelly Ruddock Mpanzu"),
            new Game("./assets/TC.jpg", 13, "Midfielder", "Tahith Chong"),
            new Game("./assets/TK.jpg", 14, "Goal Keeper", "Thomas Kaminshi"),
            new Game("./assets/TL.jpg", 14, "Centre Back", "Tom Lockyer"),
            
        };

        [HttpGet]
        public IActionResult GetGames()
        {
            return Ok(games);
        }
    }

    record Game(
        string image,
        double appearences,
        string position,
        string name 
    );
}

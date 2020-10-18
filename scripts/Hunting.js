mp.events.add(
{
	"update_animal_death" : handle => {
        if (handle == null || handle.length == 0)
            return;
        mp.game.invoke("APPLY_DAMAGE_TO_PED", 0, handle, 110, true);
	},
	
	"update_animal_position" : handle => {
		mp.events.callRemote('update_animal_position', handle, handle.position);
	}
});
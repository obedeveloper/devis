<script lang="ts">
	import { getAuthUser } from '$lib/auth/index.remote';

	const user = await getAuthUser();
</script>

<h1>Welcome back {user.name}!</h1>

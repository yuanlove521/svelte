/* generated by Svelte vX.Y.Z */
import { addListener, assign, callAll, createElement, detachNode, init, insertNode, proto, removeListener, timeRangesToArray } from "svelte/shared.js";

function create_main_fragment(state, component) {
	var audio, audio_updating = false, audio_animationframe, audio_paused_value = true;

	function audio_progress_loadedmetadata_handler() {
		audio_updating = true;
		component.set({ buffered: timeRangesToArray(audio.buffered) });
		audio_updating = false;
	}

	function audio_loadedmetadata_handler() {
		audio_updating = true;
		component.set({ seekable: timeRangesToArray(audio.seekable) });
		audio_updating = false;
	}

	function audio_timeupdate_handler() {
		audio_updating = true;
		component.set({ played: timeRangesToArray(audio.played) });
		audio_updating = false;
	}

	function audio_timeupdate_handler_1() {
		audio_updating = true;
		cancelAnimationFrame(audio_animationframe);
		if (!audio.paused) audio_animationframe = requestAnimationFrame(audio_timeupdate_handler_1);
		component.set({ currentTime: audio.currentTime });
		audio_updating = false;
	}

	function audio_durationchange_handler() {
		audio_updating = true;
		component.set({ duration: audio.duration });
		audio_updating = false;
	}

	function audio_pause_handler() {
		audio_updating = true;
		component.set({ paused: audio.paused });
		audio_updating = false;
	}

	return {
		c: function create() {
			audio = createElement("audio");
			addListener(audio, "play", audio_pause_handler);
			this.h();
		},

		h: function hydrate() {
			component._root._beforecreate.push(audio_progress_loadedmetadata_handler);

			addListener(audio, "progress", audio_progress_loadedmetadata_handler);
			addListener(audio, "loadedmetadata", audio_progress_loadedmetadata_handler);

			component._root._beforecreate.push(audio_loadedmetadata_handler);

			addListener(audio, "loadedmetadata", audio_loadedmetadata_handler);

			component._root._beforecreate.push(audio_timeupdate_handler);

			addListener(audio, "timeupdate", audio_timeupdate_handler);

			component._root._beforecreate.push(audio_timeupdate_handler_1);

			addListener(audio, "timeupdate", audio_timeupdate_handler_1);

			component._root._beforecreate.push(audio_durationchange_handler);

			addListener(audio, "durationchange", audio_durationchange_handler);

			component._root._beforecreate.push(audio_pause_handler);

			addListener(audio, "pause", audio_pause_handler);
		},

		m: function mount(target, anchor) {
			insertNode(audio, target, anchor);
		},

		p: function update(changed, state) {
			if (!audio_updating && !isNaN(state.currentTime )) {
				audio.currentTime = state.currentTime ;
			}

			if (audio_paused_value !== (audio_paused_value = state.paused)) {
				audio[audio_paused_value ? "pause" : "play"]();
			}
		},

		u: function unmount() {
			detachNode(audio);
		},

		d: function destroy() {
			removeListener(audio, "progress", audio_progress_loadedmetadata_handler);
			removeListener(audio, "loadedmetadata", audio_progress_loadedmetadata_handler);
			removeListener(audio, "loadedmetadata", audio_loadedmetadata_handler);
			removeListener(audio, "timeupdate", audio_timeupdate_handler);
			removeListener(audio, "timeupdate", audio_timeupdate_handler_1);
			removeListener(audio, "durationchange", audio_durationchange_handler);
			removeListener(audio, "pause", audio_pause_handler);
			removeListener(audio, "play", audio_pause_handler);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._beforecreate);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;
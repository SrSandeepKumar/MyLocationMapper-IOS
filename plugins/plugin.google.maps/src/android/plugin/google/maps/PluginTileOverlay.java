package plugin.google.maps;

import java.net.MalformedURLException;
import java.net.URL;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.android.gms.maps.model.TileOverlay;
import com.google.android.gms.maps.model.TileOverlayOptions;
import com.google.android.gms.maps.model.UrlTileProvider;

public class PluginTileOverlay extends MyPlugin implements MyPluginInterface {

  /**
   * Create tile overlay
   * 
   * @param args
   * @param callbackContext
   * @throws JSONException
   */
  @SuppressWarnings("unused")
  private void createTileOverlay(final JSONArray args,
    final CallbackContext callbackContext) throws JSONException {

    JSONObject opts = args.getJSONObject(1);
    int tileWidth = opts.getInt("width");
    int tileHeight = opts.getInt("height");
    final String tileUrlFormat = opts.getString("tileUrlFormat");
    UrlTileProvider tileProvider = new UrlTileProvider(tileWidth, tileHeight) {

      @Override
      public URL getTileUrl(int x, int y, int zoom) {
        String urlStr = tileUrlFormat.replaceAll("<x>", x + "")
                                     .replaceAll("<y>", y + "")
                                     .replaceAll("<zoom>", zoom + "");
        URL url = null;
        try {
          url = new URL(urlStr);
        } catch (MalformedURLException e) {
          e.printStackTrace();
        }
        return url;
      }
    };

    TileOverlayOptions options = new TileOverlayOptions();
    options.tileProvider(tileProvider);
    if (opts.has("zIndex")) {
      options.zIndex((float)opts.getDouble("zIndex"));
    }
    if (opts.has("visible")) {
      options.visible(opts.getBoolean("visible"));
    }
    TileOverlay tileOverlay = this.map.addTileOverlay(options);
    String id = "tile_" + tileOverlay.getId();
    this.objects.put(id, tileOverlay);
    

    JSONObject result = new JSONObject();
    result.put("hashCode", tileOverlay.hashCode());
    result.put("id", id);
    callbackContext.success(result);
  }

  /**
   * set z-index
   * @param args
   * @param callbackContext
   * @throws JSONException
   */
  @SuppressWarnings("unused")
  private void setZIndex(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
    String id = args.getString(1);
    float zIndex = (float) args.getDouble(2);
    this.setFloat("setZIndex", id, zIndex, callbackContext);
  }

  /**
   * Set visibility for the object
   * @param args
   * @param callbackContext
   * @throws JSONException 
   */
  protected void setVisible(JSONArray args, CallbackContext callbackContext) throws JSONException {
    boolean visible = args.getBoolean(2);
    String id = args.getString(1);
    this.setBoolean("setVisible", id, visible, callbackContext);
  }
  /**
   * Remove this tile layer
   * @param args
   * @param callbackContext
   * @throws JSONException 
   */
  protected void remove(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String id = args.getString(1);
    TileOverlay tileOverlay = (TileOverlay)this.objects.get(id);
    if (tileOverlay == null) {
      callbackContext.success();
      return;
    }
    tileOverlay.remove();
    tileOverlay.clearTileCache();
  }
  /**
   * Clear cache
   * @param args
   * @param callbackContext
   * @throws JSONException 
   */
  protected void clearTileCache(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String id = args.getString(1);
    TileOverlay tileOverlay = (TileOverlay)this.objects.get(id);
    tileOverlay.clearTileCache();
  }

  /**
   * Set fadeIn for the object
   * @param args
   * @param callbackContext
   * @throws JSONException 
   */
  protected void setFadeIn(JSONArray args, CallbackContext callbackContext) throws JSONException {
    boolean visible = args.getBoolean(2);
    String id = args.getString(1);
    this.setBoolean("setFadeIn", id, visible, callbackContext);
  }
}

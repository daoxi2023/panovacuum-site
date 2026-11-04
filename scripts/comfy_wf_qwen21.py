PROMPT_DEF = "industrial photograph of a large stainless steel vacuum chamber in a metal fabrication workshop, polished 304L surface, TIG weld seams visible, overhead crane in background, natural daylight from skylights, realistic, 35mm lens"
NEG = "text, watermark, logo, cartoon, CGI, blurry, distorted geometry"
def wf(prompt=PROMPT_DEF, neg=NEG, w=1584, h=1056, seed=7, steps=20, cfg=2.5, shift=3.1,
       unet="qwen_image_2.1_bf16.safetensors", dtype="fp8_e4m3fn",
       clip="Krea2/qwen3vl_4b_fp8_scaled.safetensors", ctype="qwen_image",
       vae="qwen_image_2.1_vae_bf16.safetensors", prefix="pano-ai"):
    return {
     "1":{"class_type":"UNETLoader","inputs":{"unet_name":unet,"weight_dtype":dtype}},
     "2":{"class_type":"CLIPLoader","inputs":{"clip_name":clip,"type":ctype}},
     "3":{"class_type":"VAELoader","inputs":{"vae_name":vae}},
     "4":{"class_type":"CLIPTextEncode","inputs":{"clip":["2",0],"text":prompt}},
     "5":{"class_type":"CLIPTextEncode","inputs":{"clip":["2",0],"text":neg}},
     "6":{"class_type":"EmptySD3LatentImage","inputs":{"width":w,"height":h,"batch_size":1}},
     "7":{"class_type":"ModelSamplingAuraFlow","inputs":{"model":["1",0],"shift":shift}},
     "8":{"class_type":"KSampler","inputs":{"model":["7",0],"positive":["4",0],"negative":["5",0],
           "latent_image":["6",0],"seed":seed,"steps":steps,"cfg":cfg,
           "sampler_name":"euler","scheduler":"simple","denoise":1.0}},
     "9":{"class_type":"VAEDecode","inputs":{"samples":["8",0],"vae":["3",0]}},
     "10":{"class_type":"SaveImage","inputs":{"images":["9",0],"filename_prefix":prefix}},
    }
